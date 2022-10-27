import mongoose from "mongoose";

const wasteSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, `Le label est requis`],
    },
    issuing_company: {
      type: String,
      required: [true, `Le nom de l'entreprise émettrice est requis`],
    },
    quantity: {
      type: String,
      required: [true, `La quantité est requise`],
    },
    dlc: {
      type: String,
      required: [true, `La date limite de consommation est requise`],
    },
    is_collected: {
      type: Boolean,
      required: [true, `Weither the waste was collected or not`],
    },
  },
  {
    timestamps: true,
  }
);

const Waste = mongoose.model("wastes", wasteSchema);

module.exports = Waste;
