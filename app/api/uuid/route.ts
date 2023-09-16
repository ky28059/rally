import {v4 as uuid} from 'uuid';
import {NextResponse} from 'next/server';


export function GET() {
    return NextResponse.json({id: uuid()});
}
