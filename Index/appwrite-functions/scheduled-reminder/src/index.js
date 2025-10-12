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

    // Get inactive users (not active for 3 days)
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    
    const inactiveSubscriptions = await databases.listDocuments(
      process.env.DATABASE_ID,
      process.env.SUBSCRIPTIONS_COLLECTION,
      ['isActive=true', `lastActive<=${threeDaysAgo}`]
    );

    const results = {
      dailyRemindersSent: 0,
      errors: []
    };

    const reminder = {
      title: '🎨 Your artistic journey awaits!',
      body: 'Feeling inspired? Your Painters\' Diary is waiting for your next masterpiece.',
      icon: '/logo_192x192.png',
      data: { url: '/create', type: 'daily-reminder' }
    };

    for (const subDoc of inactiveSubscriptions.documents) {
      try {
        const subscription = {
          endpoint: subDoc.endpoint,
          keys: JSON.parse(subDoc.keys)
        };

        await webPush.sendNotification(subscription, JSON.stringify(reminder));
        results.dailyRemindersSent++;
      } catch (error) {
        results.errors.push({
          userId: subDoc.userId,
          error: error.message
        });

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