import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import Item from "../models/item.model.js";

export const addItem = async (req, res) => {
  try {
    const { name, category, price, foodType } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.user._id });
    if (!shop) {
      return res.status(400).json({ message: "Shop not found for the user" });
    }
    const item = await Item.create({
      name,
      category,
      price,
      foodType,
      image,
      shop: shop._id,
    });
    return res.status(201).json({ message: "Item added successfully", item });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Add item failed", error: error.message });
  }
};

export const editItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, category, price, foodType } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const item = await Item.findByIdAndUpdate(
      itemId,
      { name, category, price, foodType, image },
      { new: true },
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Edit item failed", error: error.message });
  }
};
