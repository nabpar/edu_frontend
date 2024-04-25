import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState ,useEffect} from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

export default function LoginModal({ isOpen, setIsOpen }) {
  const [isLoginModal, setIsLoginModal] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[99]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full text-center max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  {isLoginModal ? (
                    <>
                      <LoginForm />
                      <span>I don't have an account.</span>
                      <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => setIsLoginModal(false)}
                      >
                        Create One
                      </span>
                    </>
                  ) : (
                    <>
                      <SignUpForm />
                      <span>I already have an account.</span>
                      <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => setIsLoginModal(true)}
                      >
                        Login
                      </span>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
