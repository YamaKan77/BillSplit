module.exports = mongoose => {
	const Bill = mongoose.model(
		"bill",
		mongoose.Schema(
			{
				billFromId: String,
				billName: String,
				billTo: String,
				billFrom: String,
				billAmount: Number,
				groupName: String,
				_partition: String,
			},
			{timestamps: true}
		)
	);

	return Bill;
}
