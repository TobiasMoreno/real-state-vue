
export const TypeBuilding = {
  id: Number,
  name: String,
};

export const Building = {
  id: Number,
  image: String,
  name: String,
  type: TypeBuilding,
  price: Number,
  beds: { type: [Number, null], default: null },
  floors: { type: [Number, null], default: null },
  bathrooms: { type: [Number, null], default: null },
  status: { type: [String, null], default: null },
  size: Number,
  direction: String,
  sale: Boolean,
};
