declare module 'nepali-date' {
    class NepaliDate {
        constructor(date?: Date | string | number);
        format(format: string): string;
        getFullYear(): number;
        getYear(): number;
        getMonth(): number;
        getDate(): number;
        getHours(): number;
        getMinutes(): number;
        getSeconds(): number;
        // You can add more methods here based on the library's documentation
    }
    export default NepaliDate;
}
