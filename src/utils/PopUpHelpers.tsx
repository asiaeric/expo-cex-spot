import { hideGlobalModal, showGlobalModal } from "@/components/GlobalModal";
import FailurePopup from "@/components/modal/Popup/FailurePopup";
import SuccessPopup from "@/components/modal/Popup/SuccessPopup";

export function showSuccessModal(title: string) {
  showGlobalModal({
    modalKey: "success-modal",
    Component: () => (
      <SuccessPopup
        onPress={() => {
          hideGlobalModal("success-modal");
        }}
        title={title}
      />
    ),
  });
}

export function showFailureModal(title?: string) {
  showGlobalModal({
    modalKey: "failure-modal",
    Component: () => (
      <FailurePopup
        onPress={() => {
          hideGlobalModal("failure-modal");
        }}
        title={title}
      />
    ),
  });
}
