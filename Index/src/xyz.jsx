 import React from 'react'
 
 function Xyz() {
    return (
      <>
        <div className="relative w-full flex flex-col items-center justify-center mt-[100px]">
        {/* Profile image */}
        
         <div
            className="mx-auto rounded-full absolute border-[5px] border-white flex items-center justify-center bg-black overflow-hidden "
        style={{
        width: "clamp(250px, 18vw, 280px)",
        height: "clamp(250px, 18vw, 280px)",
        top: "-90%",
    }}
>
    {/* Profile Image */}
    {profileImage ? (
        <img
            src={profileImage}
            alt="Uploaded"
            className="w-full h-full object-cover"
        />
    ) : (
        <span className="text-white font-serif">No Image</span>
    )}

    {/* Upload Button */}
    <input
        type="file"
        accept="image/*"
        onChange={handleProfileImageUpload}
        className="hidden"
        id="upload"
    />
    
   
</div>
{/* the button for uploading */}
<div className=' absolute lg:left-[56%] md:left-[60%] sm:left-[65%] left-[75%] top-[30%] px-2 py-1 rounded-md'>
  <label
        htmlFor="upload"
        className="absolute bottom-4 right-4 translate-x-1/2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700 px-2 py-1"
        style={{ zIndex: 50, backdropFilter: "blur(5px)", opacity: 1 }}
    >
        {profileImage ? "Edit" : "Upload"}
    </label></div>
</div>
  

 <div className="h-full lg:w-[60%] sm:w-[80%] w-[95%] bg-black/20 rounded-xl border border-[#fc8e97be] flex flex-col items-center p-6 gap-4">

 {/* Title */}
 <div className="w-full flex flex-col gap-1">
   <h1 className="text-white font-semibold">Title</h1>
   <input
     className="h-10 lg:w-[60%] md:w-[75%] sm:w-[85%] w-[90%] px-3 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fc8e97]"
     placeholder="Enter the title of the artwork"
     type="text"
   />
 </div>
 
 {/* Description */}
 <div className="w-full flex flex-col gap-1">
   <h1 className="text-white font-semibold">Description</h1>
   <textarea
     className="h-20 lg:w-[60%] md:w-[75%] sm:w-[85%] w-[90%] px-3 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fc8e97] resize-none"
     placeholder="Enter a short description..."
   />
 </div>
 
 {/* Tags */}
 <div className="w-full flex flex-col gap-1">
   <h1 className="text-white font-semibold">Tags</h1>
   <select
     className="h-10 lg:w-[60%] md:w-[75%] sm:w-[85%] w-[90%] px-3 border border-gray-500 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#fc8e97] cursor-pointer"
   >
     <option value="" disabled selected hidden>Choose a tag...</option>
     <option className="bg-[#990931] text-white">#Abstract</option>
     <option className="bg-[#990931] text-white">#Landscape</option>
     <option className="bg-[#990931] text-white">#Portrait</option>
     <option className="bg-[#990931] text-white">#Surrealism</option>
   </select>
 </div>
 
 {/* Submit Button */}
 <div className="flex justify-center w-full">
   <button className="px-6 py-2 border border-gray-500 rounded-md text-white bg-[#fc8e97] hover:bg-[#d75b6b] transition-colors duration-200">
     Submit
   </button>
 </div>
 
 </div>
 </div>
 <main className="flex-1 flex items-center justify-center pt-[120px] px-4">
        <motion.div
          className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold font-Eagle text-gray-800 mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Profile Fields */}
            <div>
              <label className="block text-gray-700 font-Playfair mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-Playfair mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-Playfair mb-1">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>

            {/* Social Media Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-Playfair text-gray-800">Social Media</h3>
              {socialLinks.map((social) => (
                <div key={social.name}>
                  <label className=" text-gray-700 font-Playfair mb-1 flex items-center gap-2">
                    <social.icon className={`${social.color} text-xl`} />
                    {social.placeholder}
                  </label>
                  <input
                    type="text"
                    name={social.name}
                    value={profile[social.name]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${social.placeholder}`}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-700/80 hover:bg-blue-800/90 text-white font-Playfair font-bold rounded-md transition-colors"
            >
              Save Changes
            </button>
          </form>

          {/* Profile Preview */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold font-Playfair text-gray-800 mb-2">Profile Preview</h3>
            <div className="space-y-2">
              <p><strong>Username:</strong> {profile.username || 'Not set'}</p>
              <p><strong>Email:</strong> {profile.email || 'Not set'}</p>
              <p><strong>Bio:</strong> {profile.bio || 'Not set'}</p>
              <div className="flex gap-4 mt-2">
                {socialLinks.map((social) => (
                  profile[social.name] && (
                    <a
                      key={social.name}
                      href={`https://${social.name}.com/${profile[social.name]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} hover:opacity-80`}
                    >
                      <social.icon className="text-2xl" />
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

     </>
 
 export default Xyz
 