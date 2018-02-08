export class User {
    constructor(
        public login: string,
        public password: string,
        public name: string,
        public surname: string,
        public email: string,
        public _id?: string,
        public course?: [string],
        public ownCourses?: [string],
        public admin?: boolean,
    ) { }

    // get _id() {
    //     return this.id;
    // }
}
