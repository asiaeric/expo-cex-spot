import { z } from "zod";

import { FeeSchema } from "@/schemas";

type Fee = z.infer<typeof FeeSchema>;

export { Fee };
