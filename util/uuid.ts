'use server'

import {v4 as uuid} from 'uuid';


export async function generateId() {
    return uuid();
}
