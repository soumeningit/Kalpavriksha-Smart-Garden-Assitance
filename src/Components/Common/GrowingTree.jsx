import React from "react";

// SVG component for the hero section animation - FINAL CORRECTED VERSION
export default function GrowingTree() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <style>
        {`
            .trunk, .branch {
                stroke: #8B5CF6; /* Violet-600 */
                fill: none;
                stroke-linecap: round;
                stroke-dasharray: 200;
                stroke-dashoffset: 200;
                opacity: 0;
            }
            .trunk {
                stroke-width: 5;
                animation: draw 2s ease-out forwards;
            }
            .branch {
                stroke-width: 4;
                animation: draw 1.5s ease-out forwards;
            }
            .leaf {
                fill: #10B981; /* Emerald-500 */
                transform-origin: 50% 50%;
                animation: pop-in 0.8s ease-out forwards;
                opacity: 0;
            }
            @keyframes draw {
                to {
                    stroke-dashoffset: 0;
                    opacity: 1;
                }
            }
            @keyframes pop-in {
                0% {
                    transform: scale(0);
                    opacity: 0;
                }
                70% {
                    transform: scale(1.1);
                    opacity: 1;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            `}
      </style>
      <g transform="translate(100, 180) scale(1, -1)">
        {/* Trunk */}
        <path
          d="M 0,0 C 10,40 10,80 0,120"
          className="trunk"
          style={{ animationDelay: "0s" }}
        />

        {/* Branches - Corrected positions to fix gap and crossing issues */}
        {/* Bottom-left branch - x-coordinate adjusted to connect to trunk */}
        <g transform="translate(4.5, 50) rotate(-40)">
          <path
            d="M 0,0 C 10,20 5,40 0,60"
            className="branch"
            style={{ animationDelay: "0.5s" }}
          />
          <circle
            cx="-5"
            cy="60"
            r="8"
            className="leaf"
            style={{ animationDelay: "1.5s" }}
          />
          <circle
            cx="5"
            cy="65"
            r="10"
            className="leaf"
            style={{ animationDelay: "1.6s" }}
          />
        </g>
        {/* Bottom-right branch - x-coordinate adjusted to connect to trunk */}
        <g transform="translate(5, 80) rotate(35)">
          <path
            d="M 0,0 C -5,25 -5,45 0,55"
            className="branch"
            style={{ animationDelay: "0.8s" }}
          />
          <circle
            cx="-5"
            cy="55"
            r="9"
            className="leaf"
            style={{ animationDelay: "1.9s" }}
          />
          <circle
            cx="8"
            cy="50"
            r="7"
            className="leaf"
            style={{ animationDelay: "2.0s" }}
          />
        </g>
        <g transform="translate(2, 110) rotate(-15)">
          <path
            d="M 0,0 C 5,15 5,25 0,35"
            className="branch"
            style={{ animationDelay: "1.1s" }}
          />
          <circle
            cx="0"
            cy="35"
            r="12"
            className="leaf"
            style={{ animationDelay: "2.3s" }}
          />
          <circle
            cx="10"
            cy="30"
            r="8"
            className="leaf"
            style={{ animationDelay: "2.4s" }}
          />
        </g>

        {/* Top leaves */}
        <circle
          cx="0"
          cy="120"
          r="10"
          className="leaf"
          style={{ animationDelay: "1.8s" }}
        />
        <circle
          cx="-10"
          cy="125"
          r="8"
          className="leaf"
          style={{ animationDelay: "1.9s" }}
        />
        <circle
          cx="10"
          cy="122"
          r="9"
          className="leaf"
          style={{ animationDelay: "2.0s" }}
        />
      </g>
    </svg>
  );
}
