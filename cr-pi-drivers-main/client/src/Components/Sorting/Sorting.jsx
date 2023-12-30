const sortDrivers = (drivers, sortOrder, sortDirection) => {
    return drivers.sort((a, b) => {
        if (sortOrder === "name" && a.name && b.name) {
            return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortOrder === "birthdate" && a.birthdate && b.birthdate) {
    return sortDirection === "asc" ? a.birthdate.localeCompare(b.birthdate) : b.birthdate.localeCompare(a.birthdate);
    }
    return 0;
});
};

const SortingOptions = ({ sortOrder, sortDirection, onSortChange }) => {
    return (
      <div>
        <label>Ordenar por:</label>
        <select value={sortOrder} onChange={(e) => onSortChange("order", e.target.value)}>
          <option value="name">Nombre</option>
          <option value="birthdate">Nacimiento</option>
        </select>
  
        <label>Dirección:</label>
        <select value={sortDirection} onChange={(e) => onSortChange("direction", e.target.value)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
    );
  };

  export { SortingOptions, sortDrivers };