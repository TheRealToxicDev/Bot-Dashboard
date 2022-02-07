import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Footer = () => {

	return (
		<>
			{' '}
			<footer className="bg-main-800" aria-labelledby="footer-heading">
				<h2 id="footer-heading" className="sr-only">
					Footer
				</h2>
				<div className="py-12 px-4 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
					<div className="xl:grid xl:grid-cols-3 xl:gap-8">
						<div className="space-y-8 xl:col-span-1">
							<span>
								<img
									src="/ProtectBot.jpg"
									style={{width: "50px", height: "50px"}}
									className="favicon w-48 h-48 transform:rotate(360deg)"
									draggable={false}
									alt="Protect Bot Logo"
								/>
							</span>
							<p className="text-white">
							  The #1 Scam Detection & Prevention System.
							</p>
							<div className="flex space-x-4">
								<a
									href="/soon"
									target="_blank"
									rel="noopener noreferrer"
									className="flex justify-center items-center w-8 h-8 bg-main-700 rounded-full hover:bg-red-500"
								>
									<span className="sr-only">Twitter</span>
									<FontAwesomeIcon
										icon={['fab', 'twitter']}
										className="text-white hover:opacity-75"
									/>
								</a>
								<a
									href="/soon"
									target="_blank"
									rel="noopener noreferrer"
									className="flex justify-center items-center w-8 h-8 bg-main-700 rounded-full hover:bg-red-500"
								>
									<span className="sr-only">GitHub</span>
									<FontAwesomeIcon
										icon={['fab', 'github']}
										className="text-white hover:opacity-75"
									/>
								</a>
								<a
									href="/discord"
									target="_blank"
									rel="noopener noreferrer"
									className="flex justify-center items-center w-8 h-8 bg-main-700 rounded-full hover:bg-red-500"
								>
									<span className="sr-only">Discord</span>
									<FontAwesomeIcon
										icon={['fab', 'discord']}
										className="text-white hover:opacity-75"
									/>
								</a>
								<a
									href="https://www.linkedin.com/company/protectbot"
									target="_blank"
									rel="noopener noreferrer"
									className="flex justify-center items-center w-8 h-8 bg-main-700 rounded-full hover:bg-red-500"
								>
									<span className="sr-only">Linkedin</span>
									<FontAwesomeIcon
										icon={['fab', 'linkedin']}
										className="text-white hover:opacity-75"
									/>
								</a>
								<a
									href="https://infinitybots.gg/bots/885954920681971723"
									target="_blank"
									rel="noopener noreferrer"
									className="flex justify-center items-center w-8 h-8 bg-main-700 rounded-full hover:bg-red-500"
								>
									<span className="sr-only">Linkedin</span>
									<FontAwesomeIcon
										icon={['fas', 'vote-yea']}
										className="text-white hover:opacity-75"
									/>
								</a>
								<a
									href="https://opencollective.com/protectbot"
									target="_blank"
									rel="noopener noreferrer"
									className="flex justify-center items-center w-8 h-8 bg-main-700 rounded-full hover:bg-red-500"
								>
									<span className="sr-only">Linkedin</span>
									<FontAwesomeIcon
										icon={['fas', 'donate']}
										className="text-white hover:opacity-75"
									/>
								</a>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-8 mt-12 xl:col-span-2 xl:mt-0">
							<div className="md:grid md:grid-cols-2 md:gap-8">
								<div>
									<h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
									   ℹ️ Info
									</h3>
									<ul className="mt-4 space-y-4">
										<li>
											<Link href={'/commands'}>
												<a className="text-white hover:text-red-500">
													<FontAwesomeIcon
														icon={['fas', 'compass']}
														className="mr-2"
													/>
													Commands
												</a>
											</Link>
										</li>
										<li>
											<Link href={'/soon'}>
												<a className="text-white hover:text-red-500">
													<FontAwesomeIcon
														icon={['fas', 'video']}
														className="mr-2"
													/>
													Dashboard
												</a>
											</Link>
										</li>
									</ul>
								</div>
								<div className="mt-12 md:mt-0">
									<h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
										👤 User
									</h3>
									<ul className="mt-4 space-y-4">
										<li>
											<Link href={'/soon'}>
												<a className="text-white hover:text-red-500">
													<FontAwesomeIcon
														icon={['fas', 'user-circle']}
														className="mr-2"
													/>
													Profile
												</a>
											</Link>
										</li>
										<li>
											<Link href={'/api/auth/authorized'}>
												<a className="text-white hover:text-red-500">
													<FontAwesomeIcon
														icon={['fas', 'sign-in-alt']}
														className="mr-2"
													/>
													Login
												</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className="md:grid md:grid-cols-2 md:gap-8">
								<div>
									<h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
										📫 Support
									</h3>
									<ul className="mt-4 space-y-4">
										<li>
											<Link href={'/discord'}>
												<a className="text-white hover:text-red-500">
													Discord
												</a>
											</Link>
										</li>
										<li>
											<Link href={'/soon'}>
												<a className="text-white hover:text-red-500">
													Twitter
												</a>
											</Link>
										</li>
									</ul>
								</div>
								<div className="mt-12 md:mt-0">
									<h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
										⚖️ Legal
									</h3>
									<ul className="mt-4 space-y-4">
										<li>
											<Link href={'/soon'}>
												<a className="text-white hover:text-red-500">
													<FontAwesomeIcon
														icon={['fas', 'gavel']}
														className="mr-2"
													/>
													Privacy
												</a>
											</Link>
										</li>
										<li>
											<Link href={'/soon'}>
												<a className="text-white hover:text-red-500">
													<FontAwesomeIcon
														icon={['fas', 'book']}
														className="mr-2"
													/>
													Terms
												</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className="mt-12 md:mt-0">
								<h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
									🧠 Misc
								</h3>
								<ul className="mt-4 space-y-4">
									<li>
										<Link href={'/partners'}>
											<a className="text-white hover:text-red-500">
												<FontAwesomeIcon
													icon={['fas', 'handshake']}
													className="mr-2"
												/>
												Partners
											</a>
										</Link>
									</li>
									<li>
										<Link href={'/soon'}>
											<a className="text-white hover:text-red-500">
												<FontAwesomeIcon
													icon={['fas', 'book-reader']}
													className="mr-2"
												/>
												Blog
											</a>
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="pt-8 mt-12 border-t border-slate-850">
						<p className="mt-4 font-semibold text-center text-white">
							© {new Date().getFullYear()} Protect Bot | All rights reserved. | Not associated with <FontAwesomeIcon icon={['fab', 'discord']} className="text-white hover:opacity-75" />
						</p>
						<br />
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;