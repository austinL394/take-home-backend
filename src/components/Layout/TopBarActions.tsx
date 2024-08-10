import { useQueryClient } from '@tanstack/react-query';
import Dropdown, { DropdownAction } from 'components/DropdownMenu';
import { useCallback, useState } from 'react';
import Modal from 'components/Modal';

const TopBarActions = () => {
  const [showRunNewReportModal, setShowRunNewReportModal] = useState(false);
  const [showActivityLogModal, setShowActivityLogModal] = useState(false);

  const [accountMenuOpened, setAccountMenuOpened] = useState(false);
  const [showSignatureManagementModal, setShowSignatureManagementModal] = useState(false);

  const queryClient = useQueryClient();

  const handleManageSignature = () => {
    setShowSignatureManagementModal(true);
    handleToggleDropdownMenu();
  };
  const handleViewActivityLog = () => {
    setShowActivityLogModal(true);
    handleToggleDropdownMenu();
  };

  const [isConfirmingSignOut, setIsConfirmingSignOut] = useState(false);

  const handleSignOut = () => {
    handleToggleDropdownMenu();
    setIsConfirmingSignOut(true);
  };

  const accountDropDownActions: DropdownAction[] = [
    {
      title: 'Manage Signature',
      action: handleManageSignature,
    },
    {
      title: 'Activity Log',
      action: handleViewActivityLog,
    },
    {
      title: 'Sign Out',
      action: handleSignOut,
    },
  ];

  const handleRunNewReport = useCallback(() => {
    setShowRunNewReportModal(true);
  }, []);

  const handleToggleDropdownMenu = () => {
    setAccountMenuOpened((prev) => !prev);
  };

  const handleRefetchPatients = async () => {
    const newFilters = {
      query: '',
      acquisitionFrom: null,
      acquisitionTo: null,
    };
    await queryClient.invalidateQueries({ queryKey: ['getSubjects', newFilters] });
  };

  const SignOutConfirmationDialog = () => {
    return (
      <Modal title="Sign Out" showModal={isConfirmingSignOut} setShowModal={setIsConfirmingSignOut}>
        <div className="w-full py-6 pb-6">
          <p className="text-[#18181B] text-sm">Are you sure you want to sign out?</p>
        </div>
        <div className="flex w-full justify-end gap-4 pb-4 px-7">
          <button
            className="btn w-[168px] bg-white flex items-center text-black py-3.5 justify-center"
            onClick={() => setIsConfirmingSignOut(false)}
          >
            Cancel
          </button>
          <button className="btn w-[168px] bg-[#18181B] flex items-center text-white py-3.5 justify-center">
            Sign Out
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="flex items-center gap-4">
      <button className="px-4 py-3.5 text-white bg-[#18181B] text-xs sm:px-9 sm:text-md " onClick={handleRunNewReport}>
        Upload ECG File
      </button>
      <div className="top-bar-account-icon">
        <Dropdown
          actions={accountDropDownActions}
          openMenu={accountMenuOpened}
          direction={'bottom'}
          onCloseMenu={() => setAccountMenuOpened(false)}
        >
        </Dropdown>
        {isConfirmingSignOut && <SignOutConfirmationDialog />}
      </div>

      <Modal
        title="Signature"
        showModal={showSignatureManagementModal}
        setShowModal={setShowSignatureManagementModal}
      ></Modal>
    </div>
  );
};

export default TopBarActions;
