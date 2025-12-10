// services/YourCollectionsService.js
import { databases, storage, account, Query, config } from '../../../appwriteConfig';
import { engagementService } from '../../../EngagementService/engagementService';
import { getArtworkViewCount } from '../../../Views/viewService';

const commercialDb = import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID;
const sellerCollection = import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID;

export class YourCollectionsService {
  static async fetchCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      console.error("Not logged in:", error);
      return null;
    }
  }

  static async fetchUserUploads(userId, activeTab) {
    try {
      const queries = [
        Query.equal("userId", userId),
        Query.orderDesc("uploadDate"),
        Query.limit(50),
        Query.select([
          '$id', 'title', 'description', 'fileId', 'medium', 'tag', 
          'userId', 'uploadDate', 'price', 'status', 'awards', 
          'fileType', 'additionalImageIds', 'isForSale'
        ])
      ];

      const response = await databases.listDocuments(
        config.databaseId,
        config.collectionId,
        queries
      );

      const uploadsWithDetails = await Promise.all(
        response.documents.map(async (doc) => {
          const [likeCount, viewCount] = await Promise.all([
            engagementService.getEngagementCount(doc.$id, 'like'),
            getArtworkViewCount(doc.$id)
          ]);

          const isImage = this.isImageType(doc.medium);
          const isVideo = doc.fileType === 'video';
          const hasAdditionalImages = doc.additionalImageIds && doc.additionalImageIds.trim();
          const additionalImageIds = hasAdditionalImages ? 
            doc.additionalImageIds.split(',').filter(id => id.trim()) : [];

          return {
            ...doc,
            isImage,
            isVideo,
            forSale: doc.price && doc.price > 0,
            isAward: doc.awards && doc.awards.length > 0,
            hasAdditionalImages,
            additionalImageIds,
            likeCount,
            viewCount,
            formattedDate: new Date(doc.uploadDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          };
        })
      );

      return this.filterUploadsByTab(uploadsWithDetails, activeTab);
    } catch (error) {
      throw new Error(`Failed to fetch collections: ${error.message}`);
    }
  }

  static isImageType(medium) {
    const imageTypes = [
      "Oil Painting", "Acrylic Painting", "Watercolor Painting", "Ink", "Charcoal", "Pastel",
      "Pencil Drawing", "Graphite Drawing", "Tempera", "Fresco Painting", "Mosaic Art",
      "Glass Art", "Fiber Art", "Sand Art", "Digital Art", "Digital Painting", "Vector Art",
      "Pixel Art", "3D Modeling", "Photography", "Mixed Media", "Collage", "Printmaking",
      "AI-Generated Art", "Augmented Reality Art", "Virtual Reality Art", "NFT Art",
      "Data Visualization Art", "Calligraphy", "Typography Design", "Sculpture", "Ceramic",
      "Installation Art", "Kinetic Art", "Light Art", "Performance Art", "Sound Art", "Bio Art",
      "Graphic Design", "Industrial Design", "Fashion Design", "Interior Design",
      "Architectural Drawing", "Game Design", "Portrait Photography", "Landscape Photography",
      "Street Photography", "Conceptual Photography", "Documentary Photography", "Micro Photography", "Other",
      'Landscape', 'Portrait', 'Watercolour', 'OilPainting', 'Abstract', 
    'StillLife', 'Historical', 'Surrealism', 'Impressionism', 'Realism', 
    'Expressionism', 'Minimalism', 'PopArt', 'Nature', 'Traditional', 
    'Digital', 'Modern', 'Photography', 'Handcraft', 'JewelleryDesign', 
    'Pottery', 'Sculpture', 'Woodwork', 'Ceramics', 'Embroidery', 
    'TextileArt', 'Calligraphy', 'PaperCraft', 'Illustration', 
    'GraphicDesign', 'FashionDesign', 'InteriorDesign', 'ProductDesign'
    ];
    return imageTypes.includes(medium);
  }

  static filterUploadsByTab(uploads, activeTab) {
    switch (activeTab) {
      case "Arts&Crafts":
        return uploads.filter(upload => upload.isImage);
      case "Videos":
        return uploads.filter(upload => upload.isVideo);
      case "Awards":
        return uploads.filter(upload => upload.isAward);
      case "Sell":
        return uploads.filter(upload => upload.forSale);
      default:
        return uploads;
    }
  }

  static async markAsSold(productId) {
    try {
      await databases.updateDocument(
        commercialDb,
        sellerCollection,
        productId,
        {
          status: "sold",
          price: 0
        }
      );
      return true;
    } catch (error) {
      throw new Error(`Failed to mark as sold: ${error.message}`);
    }
  }

  static getImageUrl(fileId) {
    return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}&width=800&quality=85`;
  }

  static getAllImageUrls(upload) {
    if (!upload || !upload.fileId) return [];
    
    const urls = [this.getImageUrl(upload.fileId)];
    
    if (upload.additionalImageIds && upload.additionalImageIds.length > 0) {
      upload.additionalImageIds.forEach(id => {
        urls.push(this.getImageUrl(id));
      });
    }
    
    return urls;
  }
}




