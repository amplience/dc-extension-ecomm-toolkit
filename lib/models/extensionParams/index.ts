import { CodecConfiguration } from "@amplience/dc-demostore-integration";

export interface ExtParameters {
    instance: InstanceParams;
    installation: CodecConfiguration
}

export type InstanceParams = {
    label: string
    view: string
    data: string
    type: string
}

export interface FieldModel {
    title: string;
    type: string;
    control: string;
    format: string;
    minLength: number;
    maxLength: number;
}