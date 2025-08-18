// // components/RichTextEditor.jsx
// import { useState, useRef, useMemo } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// export default function RichTextEditor({ value, onChange, placeholder = "Write something..." }) {
//   const quillRef = useRef(null);

//   // Toolbar config (closest to your TinyMCE needs)
//   const modules = useMemo(() => ({
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, false] }, { font: [] }, { size: [] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{ color: [] }, { background: [] }],
//         [{ align: [] }],
//         [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
//         ['link', 'image', 'code-block'],
//         ['clean'],
//       ],
//       // image handler stays default here; see step 6 for custom upload
//     }
//   }), []);

//   const formats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'color', 'background',
//     'align',
//     'list', 'bullet', 'indent',
//     'link', 'image', 'code-block'
//   ];

//   return (
//     <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
//       <ReactQuill
//         ref={quillRef}
//         theme="snow"
//         value={value}
//         onChange={onChange}
//         modules={modules}
//         formats={formats}
//         placeholder={placeholder}
//       />
//     </div>
//   );
// }



import { useState, useRef, useMemo, useCallback } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Theme
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageResize } from 'quill-image-resize-module-ts';
import { toast } from 'react-toastify';
import { storage } from '../../appwriteConfig'; // Adjust path as needed

// Register image resize module
ReactQuill.Quill.register('modules/imageResize', ImageResize);

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Write something...",
  height = "400px"
}) {
  const quillRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Custom image handler for uploads
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      setIsLoading(true);
      const editor = quillRef.current?.getEditor();
      const range = editor?.getSelection();
      
      try {
        // Upload to Appwrite storage (replace with your upload logic)
        const result = await storage.createFile(
          'YOUR_BUCKET_ID', // Replace with your bucket ID
          ID.unique(),
          file
        );
        
        // Get image URL
        const imageUrl = storage.getFileView('YOUR_BUCKET_ID', result.$id);
        
        // Insert image at cursor position
        editor?.insertEmbed(range?.index || 0, 'image', imageUrl);
        editor?.setSelection((range?.index || 0) + 1, 0);
      } catch (error) {
        console.error('Image upload failed:', error);
        toast.error('Failed to upload image');
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'script',
    'align', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'clean', 'undo', 'redo'
  ];


  const modules = useMemo(() => ({
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    handlers: {
      image: imageHandler,
      undo: () => quillRef.current?.getEditor().history.undo(),
      redo: () => quillRef.current?.getEditor().history.redo(),
    }
  },
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    parchment: ReactQuill.Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  },
  syntax: {
    highlight: text => hljs.highlightAuto(text).value
  }
}), [imageHandler]);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-black/10 z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height }}
        className="[&_.ql-editor]:min-h-[300px]"
      />
    </div>
  );
}