module.exports = mongoose => {
	const Group = mongoose.model(
		"Group",
		mongoose.Schema(
			{
				groupName: String,
				participants: [String],
				img: { data: Buffer, contentType: String},
				_partition: String,
			}
		)
	);

	return Group;
}
