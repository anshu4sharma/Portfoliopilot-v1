'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import React from 'react'
import {

    Layout,
    Layers,
    Columns,
    Grid,
    Maximize,
    Monitor,
    Palette,
    Sparkles,
} from "lucide-react";
import { updateLayoutStyle } from '@/actions/layout-actions';
import { HeroLayoutStyle } from '..';
import { GetRouteType } from '@/actions/route_actions';


type Props = {
    route: GetRouteType;
    layoutStyle: HeroLayoutStyle;
    setLayoutStyle: (layoutStyle: HeroLayoutStyle) => void;

}

export default function SelectLayouts({ route, layoutStyle, setLayoutStyle }: Props) {

    async function handleLayoutStyleChange(layoutStyle: HeroLayoutStyle) {
        setLayoutStyle(layoutStyle);
        await updateLayoutStyle(
            route?.routeId || 0,
            {
                heroSectionLayoutStyle: layoutStyle,
            },
            route?.routeName || "",
        );
    }


    return (
        <Select value={layoutStyle} onValueChange={handleLayoutStyleChange}>
            <SelectTrigger className="w-auto md:w-[180px]">
                <SelectValue placeholder="Select a layout" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="classic">
                    <div className="flex items-center">
                        <Layout className="mr-2 h-4 w-4" />
                        <p className="hidden md:flex"> Classic</p>
                    </div>
                </SelectItem>
                <SelectItem value="spotlight">
                    <div className="flex items-center">
                        <Layers className="mr-2 h-4 w-4" />
                        <p className="hidden md:flex"> Spotlight</p>
                    </div>
                </SelectItem>
                <SelectItem value="sidekick">
                    <div className="flex items-center">
                        <Columns className="mr-2 h-4 w-4" />
                        <p className="hidden md:flex"> Sidekick</p>
                    </div>
                </SelectItem>
                <SelectItem value="minimalist">
                    <div className="flex items-center">
                        <Grid className="mr-2 h-4 w-4" />
                        <p className="hidden md:flex"> Minimalist</p>
                    </div>
                </SelectItem>
                <SelectItem value="banner">
                    <div className="flex items-center">
                        <Maximize className="mr-2 h-4 w-4" />
                        <p className="hidden md:flex"> Banner</p>
                    </div>
                </SelectItem>
                <SelectItem value="modern">
                    <div className="flex items-center">
                        <Monitor className="mr-2 h-4 w-4" />
                        <p className="hidden md:flex"> Modern</p>
                    </div>
                </SelectItem>
                <SelectItem value="dynamic">
                    <div className="flex items-center">
                        <Sparkles className="mr-2 h-4 w-4" />
                        <p className="hidden md:flex"> Dynamic</p>
                    </div>
                </SelectItem>
                <SelectItem value="elegant">
                    <div className="flex items-center">
                        <Palette className="mr-2 h-4 w-4" />
                        <p className="hidden md:flex"> Elegant</p>
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    )
}