declare module 'react-jdenticon' {
    import { Component } from 'react';

    interface JdenticonProps {
        size?: number | string;
        value: string;
    }

    export default class Jdenticon extends Component<JdenticonProps> {}
}