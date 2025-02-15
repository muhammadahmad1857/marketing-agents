export interface CallHistory {
    _id: string;
    call_id: string;
    call_to: string;
    call_from: string;
    call_date: string;
    call_time: string;
    call_duration: string;
    call_transcript: string;
    call_status: string;
    user_email: string;
    summary: string;
    price: number;
    inbound: boolean;
};