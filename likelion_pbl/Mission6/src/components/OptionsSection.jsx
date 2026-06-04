function OptionsSection({ filter, sort, search, onFilterChange, onSortChange, onSearchChange }) {
  return (
    <section className="options-section">
      <div className="options-container">
        <div className="filter-group">
          <label htmlFor="filter-part">파트 필터</label>
          <select id="filter-part" value={filter} onChange={(e) => onFilterChange(e.target.value)}>
            <option value="all">전체</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
          </select>
        </div>
        <div className="sort-group">
          <label htmlFor="sort-order">정렬 방식</label>
          <select id="sort-order" value={sort} onChange={(e) => onSortChange(e.target.value)}>
            <option value="latest">최신추가순</option>
            <option value="name">이름순</option>
          </select>
        </div>
        <div className="search-group">
          <label htmlFor="search-input">이름 검색</label>
          <input
            type="text"
            id="search-input"
            placeholder="이름을 입력하세요..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

export default OptionsSection;
