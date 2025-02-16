function TagItem(props) {
    const { dataTag, countJobs } = props;
    return (
        <>
            {dataTag.map((tag) => (
                <div key={tag._id} className="inner-card">
                    <div className="inner-image">
                        <img src="https://static.careerlink.vn/web/images/categories/1.svg" alt="Tag" />
                    </div>
                    <div className="inner-content">
                        <p className="inner-text">{tag.TagsName}</p>
                        <p className="inner-count">{countJobs[tag._id] ?? 0} việc làm</p>
                    </div>
                </div>
            ))}
        </>
    );
};
export default TagItem;