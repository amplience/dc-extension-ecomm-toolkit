import { CommerceCodec } from "@amplience/dc-integration-middleware";

export interface ExtParameters {
    instance: InstanceParams;
    installation: CommerceCodec
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