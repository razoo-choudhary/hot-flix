import {Mailing} from "../config/mailing";

export class EmailService extends Mailing{
    static initEmailService = Mailing.Init()
}

export const Email = EmailService.initEmailService