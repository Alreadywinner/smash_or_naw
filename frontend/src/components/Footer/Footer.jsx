import { Footer as FlowFooter } from "flowbite-react";

const Footer = () => {
  return (
    <FlowFooter container={true}>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FlowFooter.Brand
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="Smash or Naw"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FlowFooter.Title title="about" />
              <FlowFooter.LinkGroup col={true}>
                <FlowFooter.Link href="/" className="cursor-pointer">
                  About Us
                </FlowFooter.Link>
                <FlowFooter.Link href="/" className="cursor-pointer">
                  Contact Us
                </FlowFooter.Link>
              </FlowFooter.LinkGroup>
            </div>
            <div>
              <FlowFooter.Title title="Follow us" />
              <FlowFooter.LinkGroup col={true}>
                <FlowFooter.Link href="/" className="cursor-pointer">
                  Github
                </FlowFooter.Link>
                <FlowFooter.Link href="/" className="cursor-pointer">
                  Discord
                </FlowFooter.Link>
              </FlowFooter.LinkGroup>
            </div>
            <div>
              <FlowFooter.Title title="Legal" />
              <FlowFooter.LinkGroup col={true}>
                <FlowFooter.Link href="/" className="cursor-pointer">
                  Privacy Policy
                </FlowFooter.Link>
                <FlowFooter.Link
                  href="/terms-and-conditions"
                  className="cursor-pointer"
                >
                  Terms & Conditions
                </FlowFooter.Link>
              </FlowFooter.LinkGroup>
            </div>
          </div>
        </div>
        <FlowFooter.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FlowFooter.Copyright href="/" by="Smash or Naw™" year={2023} />
          {/* <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
        <FlowFooter.Icon
          href="#"
          icon={BsFacebook}
        />
        <FlowFooter.Icon
          href="#"
          icon={BsInstagram}
        />
        <FlowFooter.Icon
          href="#"
          icon={BsTwitter}
        />
        <FlowFooter.Icon
          href="#"
          icon={BsGithub}
        />
        <FlowFooter.Icon
          href="#"
          icon={BsDribbble}
        />
      </div> */}
        </div>
      </div>
    </FlowFooter>
  );
};

export default Footer;
