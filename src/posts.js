import { DateTime } from "luxon";
export const today = {
    id: "1",
    authorId: "-1",
    title: "Today",
    created: DateTime.now().toISO(),
    markdown: '',
    html: '',
};
export const thisWeek = {
    id: "2",
    authorId: "-1",
    title: "This Week",
    created: DateTime.now().minus({ days: 5 }).toISO(),
    markdown: '',
    html: '',
};
export const thisMonth = {
    id: "3",
    authorId: "-1",
    title: "This Month",
    created: DateTime.now().minus({ weeks: 3 }).toISO(),
    markdown: '',
    html: '',
};