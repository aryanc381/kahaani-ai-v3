export interface IUser {
    userDetails: {
        fullName: string;
        email: string;
        phone: string;
        password: string;
        token: string;
        pendingUsers: string[],
        acceptedUsers: string[],
        tours: {
            city: number[];
            museums: number[];
            monuments: [];
        },
        persona: string;
    }
}