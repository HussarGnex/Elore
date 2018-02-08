import { Lesson } from './lesson.client.interface';

export class Course {
    constructor(
        public title: string,
        public description: string,
        public author: string,
        public _id?: string,
        public lesson?: [Lesson],
        public allowedUsers?: [string],
        public pendingUsers?: [string],
    ) { }
}