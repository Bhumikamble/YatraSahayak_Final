import { Itinerary } from "../models/itinerary.model";

const additinerary = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let itineraryadd = await Itinerary.findOne({ userId: req.user.id });

    if (!itineraryadd) {
      itineraryadd = new Itinerary({ userId: req.user.id, items: [] });
    }

    const itemIndex = itineraryadd.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity if product already in itineraryadd
      itineraryadd.items[itemIndex].quantity += quantity;
    } else {
      // Add new product to itineraryadd
      itineraryadd.items.push({ productId, quantity });
    }

    await itineraryadd.save();
    res.status(200).json(itineraryadd);
  } catch (error) {
    res.status(500).json({ message: "Error adding to itineraryadd", error });
  }
};

// Remove product from itineraryadd
const removeitinerary = async (req, res) => {
  const { productId } = req.params;

  try {
    const itineraryadd = await Cart.findOne({ userId: req.user.id });

    if (!itineraryadd)
      return res.status(404).json({ message: "Cart not found" });

    itineraryadd.items = itineraryadd.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await itineraryadd.save();
    res.status(200).json(itineraryadd);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing from itineraryadd", error });
  }
};

// Get user itineraryadd
const getitinerary = async (req, res) => {
  try {
    const itineraryadd = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );
    res.status(200).json(itineraryadd);
  } catch (error) {
    res.status(500).json({ message: "Error fetching itineraryadd", error });
  }
};

export { getitinerary, removeitinerary, additinerary };
