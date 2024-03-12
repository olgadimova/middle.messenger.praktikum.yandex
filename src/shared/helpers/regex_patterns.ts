export const namePattern = /^[A-ZЁА-Я][a-zA-ZЁA-Яёа-я-]+$/;

export const loginPattern = /^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$/;

export const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;

export const phonePattern = /^(\+)?\d{10,15}$/;

export const messagePattern = /^(?!\s*$).+$/;
