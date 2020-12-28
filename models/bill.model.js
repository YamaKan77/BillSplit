module.exports = mongoose => {
	const Bill = mongoose.model(
		"Bill",
		mongoose.Schema(
			{
				billFromId: String,
				billName: String,
				billTo: String,
				billFrom: String,
				billAmount: Number,
				groupName: String,
				_partition: String,
			}
		)
	);

	return Bill;
}
