export interface ExtParameters {
    instance: InstanceParams;
    installation: any
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