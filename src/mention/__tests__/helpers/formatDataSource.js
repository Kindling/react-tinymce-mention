
export default function formatDataSource(dataSource) {
  const formatted = dataSource.map(d => ({ displayLabel: d, searchKey: d }));
  const wrap = (data) => ({ dataSource: data });

  return {
    formatted,
    wrap
  };
}
