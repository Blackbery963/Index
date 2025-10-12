const { default: sdk } = require('node-appwrite');
const webPush = require('web-push');

module.exports = async (req, res) => {
  try {
    // Initialize Appwrite
    const client = new sdk.Client();
    const databases = new sdk.Databases(client);
    
    client
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    // Initialize web-push
    webPush.setVapidDetails(
      'mailto:your-email@example.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    const { title, body, data = {}, segment = 'all' } = JSON.parse(req.payload);

    // Get all active subscriptions
    let queries = ['isActive=true'];
    
    if (segment !== 'all') {
      queries.push(`segment=${segment}`);
    }

    const subscriptions = await databases.listDocuments(
      process.env.DATABASE_ID,
      process.env.SUBSCRIPTIONS_COLLECTION,
      queries
    );

    const payload = {
      title,
      body,
      icon: '/logo_192x192.png',
      badge: '/logo_512x512.png',
      data: {
        url: data.url || '/',
        type: data.type || 'broadcast',
        ...data
      }
    };

    const results = {
      successful: 0,
      failed: 0,
      errors: []
    };

    // Send to all subscribers
    for (const subDoc of subscriptions.documents) {
      try {
        const subscription = {
          endpoint: subDoc.endpoint,
          keys: JSON.parse(subDoc.keys)
        };

        await webPush.sendNotification(subscription, JSON.stringify(payload));
        results.successful++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          userId: subDoc.userId,
          error: error.message
        });

        // Deactivate expired subscriptions
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

    // Log the notification sent
    await databases.createDocument(
      process.env.DATABASE_ID,
      process.env.NOTIFICATIONS_COLLECTION,
      'unique()',
      {
        title,
        body,
        segment,
        sentTo: results.successful,
        failed: results.failed,
        sentAt: new Date().toISOString()
      }
    );

    res.json(results);
  } catch (error) {
    res.json({ error: error.message });
  }
};