export default class Helper {
    static forEachKey<T, U>(map: T, callback: (key: string) => U): U {
        let result: U;
        for (let id in map) {
            if ((result = callback(id))) break;
        }
        return result;
    }

    static capitalize(s: string): string {
        return s && s[0].toUpperCase() + s.slice(1);
    }
}
