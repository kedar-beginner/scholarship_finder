import React from 'react'
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <div>
         <footer className="bg-gray-900 text-white py-4 text-center">
            <div className="flex justify-center space-x-6">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="text-xl hover:text-blue-400 transition duration-300" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-xl hover:text-pink-500 transition duration-300" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="text-xl hover:text-blue-600 transition duration-300" />
                </a>
            </div>
            <p className="text-sm mt-2">© {new Date().getFullYear()} scholarshipHunt. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default Footer
