export default function NavToolbar({
  leftOptions,
  rightOptions,
  periodContext,
  selectedPage,
  onPeriodContextChange,
  onSelectedPageChange,
}) {
  const lr_options_width = `${6 * leftOptions.length}%`

  const makeNavButton = (pagename: string) => (
    <button
      className={
        selectedPage == pagename
          ? `icon icon-${pagename}-selected icon-selected`
          : `icon icon-${pagename}`
      }
      onClick={() => onSelectedPageChange(pagename)}
      key={pagename}
    ></button>
  )

  const makeDummy = (key) => <button className="icon" key={key}></button>

  return (
    <div className="nav-toolbar">
      <div className="icon-group" style={{ width: lr_options_width }}>
        {leftOptions.map((pagename: string) =>
          pagename != 'dummy' ? makeNavButton(pagename) : makeDummy()
        )}
      </div>

      {selectedPage == 'calendar' && (
        <div className="date-toggle">
          {['day', 'week', 'month'].map((periodname) => (
            <button
              className={
                periodContext == periodname ? 'date-toggle-button-selected' : ''
              }
              onClick={() => onPeriodContextChange(periodname)}
              key={periodname}
            >
              {periodname.toUpperCase()}
            </button>
          ))}
        </div>
      )}
      <div className="icon-group" style={{ width: lr_options_width }}>
        {rightOptions.map((pagename: string, idx: number) =>
          pagename != 'dummy' ? makeNavButton(pagename) : makeDummy(idx)
        )}
      </div>
    </div>
  )
}
