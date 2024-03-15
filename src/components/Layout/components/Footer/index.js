function Footer() {
    return (
        <div className="Footer bg-[#f2f2f2] z-20">
            <div className="flex flex-row flex-wrap lg:flex-nowrap lg:py-[24px] lg:px-[193px] md:px-[200px] items-start lg:gap-[82px] px-[50px] py-[50px]">
                <div className="w-1/2 md:w-1/3">
                    <p className="text-base font-semibold py-1">Company</p>
                    <div className="py-1">
                        <p href="#" className="text-base">
                            About Us
                        </p>
                    </div>
                    <div className="py-1">
                        <p href="#" className="text-base">
                            Blog
                        </p>
                    </div>
                    <div className="py-1">
                        <p href="#" className="text-base">
                            We're hiring
                        </p>
                    </div>
                    <div className="py-1">
                        <p href="#" className="text-base">
                            Contact Us
                        </p>
                    </div>
                </div>
                <div className="w-1/2 md:w-1/3">
                    <p className="text-base font-semibold py-1">Social</p>
                    <div className="py-1">
                        <p href="#" className="text-base">
                            Twitter
                        </p>
                    </div>
                    <div className="py-1">
                        <p className="text-base">Youtube</p>
                    </div>
                    <div className="py-1">
                        <p href="#" className="text-base">
                            Facebook
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-1/3 mt-[45px] md:mt-0">
                    <p className="text-base font-semibold py-1">Community</p>
                    <div className="py-1">
                        <p href="#" className="text-base">
                            Forums
                        </p>
                    </div>
                    <div className="py-1">
                        <p className="text-base">Support</p>
                    </div>
                    <div className="py-1">
                        <p className="text-base">Documentation</p>
                    </div>
                </div>
                <div className="md:w-full mt-[45px] md:mt-[60px] lg:mt-0">
                    <p className="text-base font-semibold py-1">Sign Up For Email & Get 50 Points!</p>
                    <p className="py-1">Offer delivered within 4 days after signup.</p>
                    <div className="py-1">
                        <div>
                            <input
                                type="text"
                                id="small-input"
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs"
                            />
                            <button
                                type="submit"
                                id="add-btn"
                                className="text-white bg-[#0F6CBD] hover:bg-blue-800 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
