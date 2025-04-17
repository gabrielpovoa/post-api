import z from 'zod';
import { schema } from '../zod';


export type DataType = z.infer<typeof schema>
