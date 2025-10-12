const { default: sdk } = require('node-appwrite');
const webPush = require('web-push');

module.exports = async (req, res) => {
  try {
    const client = new sdk.Client();
    const databases = new sdk.Databases(client);
    
    client
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    webPush.setVapidDetails(
      'mailto:your-email@example.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    const { reminderType, customMessage } = JSON.parse(req.payload);

    // Define reminder templates
    const reminders = {
      welcome: {
        title: '👋 Welcome to Painters\' Diary!',
        body: 'Start creating your first artwork and explore our features.',
        data: { url: '/create', type: 'welcome' }
      },
      inactive: {
        title: '🎨 Missed creating art?',
        body: 'Your canvas is waiting for you! Come back and create something beautiful.',
        data: { url: '/gallery', type: 'inactive' }
      },
      newFeature: {
        title: '🚀 New Feature Available!',
        body: 'Check out our latest tools to enhance your artwork.',
        data: { url: '/features', type: 'new-feature' }
      },
      custom: {
        title: '📢 Update from Painters\' Diary',
        body: customMessage,
        data: { url: '/', type: 'custom' }
      }
    };

    const reminder = reminders[reminderType] || reminders.custom;

    // Get target users based on reminder type
    let queries = ['isActive=true'];
    
    if (reminderType === 'inactive') {
      // Users who haven't been active in 7 days
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      queries.push(`lastActive<=${oneWeekAgo}`);
    } else if (reminderType === 'welcome') {
      // Users who signed up in last 24 hours but haven't created anything
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      queries.push(`createdAt>=${oneDayAgo}`, `artworksCount=0`);
    }

    const subscriptions = await databases.listDocuments(
      process.env.DATABASE_ID,
      process.env.SUBSCRIPTIONS_COLLECTION,
      queries
    );

    const results = {
      successful: 0,
      failed: 0,
      reminderType,
      totalTargeted: subscriptions.total
    };

    for (const subDoc of subscriptions.documents) {
      try {
        const subscription = {
          endpoint: subDoc.endpoint,
          keys: JSON.parse(subDoc.keys)
        };

        await webPush.sendNotification(subscription, JSON.stringify(reminder));
        results.successful++;
      } catch (error) {
        results.failed++;
        
        if (error.statusCode === 410) {
          await databases.updateDocument(
            process.env.DATABASE_ID,
            process.env.SUBSCRIPTIONS_COLLECTION,
            subDoc.$id,
            { isActive: false }
          );
        }
      }
    }

    res.json(results);
  } catch (error) {
    res.json({ error: error.message });
  }
};