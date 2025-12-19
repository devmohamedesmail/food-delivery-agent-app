import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductController from "@/controllers/products/controller";
import { Toast } from "toastify-react-native";

export const useUpdateProduct = ({
  token,
  storeId,
  onSuccessCallback,
}: {
  token: string;
  storeId: number;
  onSuccessCallback?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productID,
      formData,
    }: {
      productID: number;
      formData: FormData;
    }) =>
      ProductController.updateProduct({
        productID,
        formData,
        token,
      }),

    onSuccess: () => {
      Toast.success("Product updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["products", storeId],
      });
      onSuccessCallback?.();
    },

    onError: (error) => {
      console.log("Failed to update product", error);
      Toast.error("Failed to update product");
    },
  });
};
