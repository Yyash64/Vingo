import uploadOnCloudinary from "../utils/cloudinary.js";
import Shop from "../models/shop.model.js";

export const createEditShop = async (req, res) => {
  try {
    const { name, city, address, state } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    let shop = await Shop.findOne({ owner: req.user._id });
    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        address,
        state,
        owner: req.user._id,
        image,
      });
    } else {
      shop = await Shop.findByIdAndUpdate(
        shop._id,
        {
          name,
          city,
          address,
          state,
          ...(image && { image }),
          owner: req.user._id,
        },
        { new: true },
      );
    }
    await shop.populate("owner");
    return res.status(201).json({ message: "Shop created successfully", shop });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Create shop failed", error: error.message });
  }
};

export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.user._id });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    await shop.populate("owner items");
    return res.status(200).json({ shop });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch shop", error: error.message });
  }
};
