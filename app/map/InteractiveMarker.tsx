import Event from "@/components/Event"
import type { Building, Event as EventProps } from "@/util/events"
import { InfoWindow, Marker } from "@react-google-maps/api"

type InteractiveMarkerProps = {
	building: Building
	events: EventProps[]
	openBuilding: string
	setOpenBuilding: (openId: string) => void
}

export default function InteractiveMarker(props: InteractiveMarkerProps) {
	return (
		<Marker
			key={props.building.abbr}
			position={{ lat: props.building.lat, lng: props.building.lng }}
			label={props.events.length > 1 ? `${props.events.length}` : undefined}
			onClick={() => props.setOpenBuilding(props.building.abbr)}
        >
			{props.openBuilding == props.building.abbr && (
				<InfoWindow
					position={{ lat: props.building.lat, lng: props.building.lng }}
					onCloseClick={() => props.setOpenBuilding("")}>
					<div className="flex gap-2 overflow-x-auto overflow-y-clip w-max">
						{props.events.map(event => (
							<Event key={event.id} className="w-72" {...event}></Event>
						))}
					</div>
				</InfoWindow>
			)}
		</Marker>
	)
}
