import Notification from "../models/notification.model.js";

export const getNotification = async (req, res) => {
  try {
    const userId = req.user._id;

    const notification = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notification);
  } catch (error) {
    console.log("Error in getNotification function: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotifciation function:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user._id;
    const notification = await Notification.findById(notificationId);

    if (!notification)
      return res.status(404).json({ error: "Notification not found" });

    if (notification.to.toString() !== userId.toString()) {
      return res
        .status(404)
        .json({ error: "you are not allowed to delete this notification" });
    }

    await Notification.findByIdAndDelete(notification);

    res.status(200).json({ message: "notification deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotification function:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
