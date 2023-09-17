import {useState} from 'react';
import {DateTime} from 'luxon';
import {Popover} from '@headlessui/react';
import AnimatedPopover from '@/components/AnimatedPopover';

// Icons
import {MdFastForward, MdFastRewind, MdSkipNext, MdSkipPrevious} from 'react-icons/md';
import {BsFillCalendar2WeekFill} from 'react-icons/bs';


type DateTimePickerProps = {
    date: DateTime,
    setDate: (date: DateTime) => void
    earliestDate?: DateTime,
}
export default function DateTimePicker(props: DateTimePickerProps) {
    const [displayDate, setDisplayDate] = useState(props.date.startOf("month"))

    return (
        <div className="flex gap-2 bg-gray-200 rounded py-1 px-2">
            <Popover>
                <Popover.Button className="font-semibold text-gray-700 flex gap-2 items-center">
                    <BsFillCalendar2WeekFill />
                    <p className="pt-0.5">{props.date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</p>
                </Popover.Button>
                <AnimatedPopover className="absolute bg-white z-10 px-2 rounded shadow-lg">
                    <div className="flex pt-4 pb-1 font-semibold gap-2 border-b border-gray-300 text-gray-500">
                        <button onClick={() => setDisplayDate(displayDate.minus({year: 1}))}>
                            <MdSkipPrevious />
                        </button>
                        <button onClick={() => setDisplayDate(displayDate.minus({month: 1}))}>
                            <MdFastRewind />
                        </button>
                        <button
                            onClick={() => setDisplayDate(props.date.startOf("month"))}
                            className="mx-auto text-black"
                        >
                            {displayDate.toLocaleString({ month: "long" })} {displayDate.year}
                        </button>
                        <button onClick={() => setDisplayDate(displayDate.plus({month: 1}))}>
                            <MdFastForward />
                        </button>
                        <button onClick={() => setDisplayDate(displayDate.plus({year: 1}))}>
                            <MdSkipNext />
                        </button>
                    </div>
                    <div className="grid grid-cols-7">
                        {Array(displayDate.daysInMonth).fill(0).map((_, day) => {
                            const date = DateTime.fromObject({
                                year: displayDate.year,
                                month: displayDate.month,
                                day: day + 1
                            });
                            return (
                                <button
                                    onClick={() => props.setDate(date)}
                                    className={'p-2 transition duration-100 bg-white disabled:bg-gray-200 disabled:text-gray-500 ' + (props.date.startOf('day').equals(date) ? 'bg-yellow-300' : 'hover:bg-gray-100')}
                                    style={day === 0 ? {gridColumnStart: (displayDate.weekday)} : undefined}
                                    disabled={(props.earliestDate && date.valueOf() < props.earliestDate.valueOf())}
                                >
                                    {day + 1}
                                </button>
                            )
                        })}
                    </div>
                </AnimatedPopover>
            </Popover>

            <input
                type="time"
                value={props.date.toLocaleString(DateTime.TIME_24_SIMPLE)}
                required
                className="invalid:border border-red-500"
                onChange={(event) => props.setDate(DateTime.fromObject({
                    year: props.date.year,
                    month: props.date.month,
                    day: props.date.day,
                    hour: parseInt(event.target.value.split(":")[0]),
                    minute: parseInt(event.target.value.split(":")[1]),
                    second: 0,
                }))}
                min={props.earliestDate && props.date.startOf('day').equals(props.earliestDate.startOf('day')) ?
                    props.earliestDate.toLocaleString(DateTime.TIME_24_SIMPLE) : undefined}
            />
        </div>
    )
}
