import { HOURS } from '../data';
import { clock } from '../lib/hours';
import { useBarClock } from '../lib/useBarClock';

/** The week, with tonight's session marked. After midnight, "tonight" is still yesterday's row. */
export function HoursTable() {
  const { status } = useBarClock();
  const current = status.session;
  const tag = status.open ? 'Tonight' : status.sameDay ? 'Today' : 'Next';
  return (
    <table className="hours">
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        {HOURS.map((h, i) => (
          <tr key={h.day} className={i === current ? 'is-today' : undefined} aria-current={i === current ? 'date' : undefined}>
            <th scope="row">
              {h.label}
              {i === current && <span className="hours-tag">{tag}</span>}
            </th>
            <td>
              {clock(h.open, { noon: false })}–{clock(h.close)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
