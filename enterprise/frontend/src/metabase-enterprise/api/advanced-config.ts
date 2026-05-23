import type { ApplyAdvancedConfigRequest } from "metabase-types/api";

import { EnterpriseApi } from "./api";
import { invalidateTags, listTag, tag } from "./tags";

export const advancedConfigApi = EnterpriseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyAdvancedConfig: builder.mutation<void, ApplyAdvancedConfigRequest>({
      query: ({ config }) => {
        const formData = new FormData();
        formData.append("config", config);
        return {
          method: "POST",
          url: "/api/ee/advanced-config",
          // Pass FormData directly. The legacy `body: { formData }` +
          // `formData: true` shape predated the unified API client; the new
          // client detects `body instanceof FormData` and lets the browser set
          // the multipart Content-Type. Wrapping it in an object now would
          // JSON.stringify the wrapper and send "[object FormData]" as the body.
          body: formData,
        };
      },
      invalidatesTags: (_, error) =>
        invalidateTags(error, [
          tag("workspace"),
          listTag("workspace"),
          listTag("database"),
        ]),
    }),
  }),
});

export const { useApplyAdvancedConfigMutation } = advancedConfigApi;
