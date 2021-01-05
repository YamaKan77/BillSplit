module.exports = mongoose => {
	const Group = mongoose.model(
		"Group",
		mongoose.Schema(
			{
				groupName: String,
				participants: [String],
				_partition: String,
			}
		)
	);

	return Group;
}
