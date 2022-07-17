! function(UV) {
	let RANDOM_ENCOUNTER = __config__.getInteger("random_encounter") || 5;
	if (RANDOM_ENCOUNTER < 1 || 16 < RANDOM_ENCOUNTER) log("Sorry, only encounters between 1..16 accepted");
	else {
		let MODIFIER = 16 * __config__.getInteger("atlas_modifier") + 16;
		if (MODIFIER < 16 || 128 < MODIFIER) log("Sorry, only modifiers between 0..7 accepted");
		else {
			let ATLAS_CLEAN = __config__.getBool("atlas_clean"),
				Files = Packages.com.zhekasmirnov.innercore.utils.FileTools,
				$tip = function(e) {
					let a = Packages.com.zhekasmirnov.horizon.HorizonApplication.getTopActivity();
					if (a) {
						let t = a.findViewById(e.id.main_menu_progress_label);
						return t ? function(e) {
							a.runOnUiThread(function() {
								(new android.os.Handler).postDelayed(function() {
									t.setText(String(e))
								}, 0)
							})
						} : (log("Label not found in activity"), new Function)
					}
					return log("Activity is not running"), new Function
				}(Packages.com.zheka.horizon.R);
			$tip("preparing");
			let FACE_UV = new Object,
				FACE = new Object;
			for (let type in UV)
				for (let face in FACE_UV[type] = new Array, UV[type]) FACE_UV[type].push(face), FACE[face] = UV[type][face];
			let $rnd = function(e, t) {
					return void 0 === t && (t = e, e = 0), Math.floor(Math.random() * (t - e + 1)) + e
				},
				$chance = function() {
					return [0, 0, 0, 0, 1, 1, 1, 2, 2, 3][$rnd(9)]
				},
				$pic = function() {
					let e = FACE_UV[$chance()];
					return e[$rnd(e.length - 1)]
				},
				$dec = function() {
					let e = new java.lang.String("8119745113154120").getBytes(),
						n = new javax.crypto.spec.IvParameterSpec(e),
						t = new java.lang.String("admin").toCharArray(),
						m = new java.lang.String("admin").getBytes();
					let a = javax.crypto.SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
					let g = new javax.crypto.spec.PBEKeySpec(t, m, 10, 128),
						r = a.generateSecret(g).getEncoded();
					return function(b) {
						let s = new javax.crypto.spec.SecretKeySpec(r, "AES");
						let a = javax.crypto.Cipher.getInstance("AES/CBC/PKCS5Padding");
						return a.init(javax.crypto.Cipher.DECRYPT_MODE, s, n), a.doFinal(b)
					}
				}(),
				$byt = function(e) {
					e = new java.io.File(e), e = new java.io.FileInputStream(e);
					return $dec(Files.convertStreamToBytes(e))
				};
			let ja, ka, la;
			! function(n, r) {
				let t = function(t) {
						let a = new Array;
						for (let e = 0; e < t; e++) {
							let n = $pic(); - 1 == a.indexOf(n) && a.push(n)
						}
						return a
					}($rnd(5, 8)),
					a = t.map(function(e, t, a) {
						return new java.io.File(n, e)
					});
				a = a.filter(function(e, t, a) {
					return e.isFile()
				});
				let i = new java.io.File(r + ".bak");
				if (!i.exists()) {
					let t = new java.io.FileInputStream(r),
						a = new java.io.ByteArrayOutputStream;
					let s = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024),
						c = function() {
							for (;;) {
								let e = t.read(s);
								if (e < 0) return a.toByteArray();
								a.write(s, 0, e)
							}
						}();
					i.createNewFile();
					let e = new java.io.FileOutputStream(i.getPath());
					e.write(c), e.close()
				}
				let e = java.nio.charset.Charset.forName("US-ASCII"),
					o = new java.util.zip.ZipFile(i.getPath(), e),
					d = new java.io.FileOutputStream(r),
					l = new java.io.BufferedOutputStream(d),
					f = new java.util.zip.ZipOutputStream(l, e);
				for (let e = 0; e < t.length; e++) {
					let u = new java.util.zip.ZipEntry("background@" + (e + 1) + ".png");
					f.putNextEntry(u), $tip("encoding " + e + "/" + t.length + " background");
					u = $byt(a[e]);
					f.write(u, 0, u.length), f.closeEntry()
				}
				let p = o.entries();
				for (; p.hasMoreElements();) {
					let n = p.nextElement();
					if (!n.getName().startsWith("background")) {
						f.putNextEntry(n);
						let e = o.getInputStream(n),
							t = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096),
							a;
						for (; 0 <= (a = e.read(t, 0, 4096));) f.write(t, 0, a);
						f.closeEntry()
					}
				}
				f.close(), o.close()
			}(__dir__ + "assets", __packdir__ + ".cached_graphics"),
			function(e) {
				let t = new java.io.FileInputStream(e),
					a = new Packages.com.zhekasmirnov.horizon.launcher.pack.PackGraphics(t);
				if (t.close(), null != (e = a.getGroupWithBrightnessThreshold("background", .45))) {
					let t = new Packages.com.zhekasmirnov.horizon.activity.main.AnimatedBitmapCollectionDrawable(e, 9e3, 750);
					t.setAnimationParameters(35e-5, 50, 25, !0);
					let a = Packages.com.zhekasmirnov.horizon.HorizonApplication.getTopActivity();
					if (a) {
						let e = a.findViewById(Packages.com.zheka.horizon.R.id.main_menu_background);
						return e ? a.runOnUiThread(function() {
							(new android.os.Handler).postDelayed(function() {
								e.setImageDrawable(t)
							}, 0)
						}) : log("Background not found in activity")
					}
					log("Activity is not running")
				}
			}(__packdir__ + ".cached_graphics"), $tip("restoring resources"), ja = Packages.com.zhekasmirnov.mcpe161.InnerCore.getInstance().allResourceDirectories, ka = new java.io.File(__dir__ + "resources"), la = ja.indexOf(ka), -1 != la && ja.remove(la), ja.add(0, ka);
			let $hex = function(a) {
				for (let e = 1; e < arguments.length; e++)
					if (null != a[arguments[e]]) {
						let t = [];
						let n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
						for (let e = 0; e < 6; e++) t.push(n[$rnd(16)]);
						a[arguments[e]] = "#" + t.join("")
					}
			};
			! function() {
				let e = __dir__ + "assets/resource_packs/devseverywhere/";
				Files.assureDir(e);
				let t = String(__mod__.getInfoProperty("description"));
				if (Files.writeFileText(e + "/manifest.json", JSON.stringify({
						format_version: 2,
						header: {
							description: t,
							name: __name__,
							uuid: "37868fc0-b506-42cc-88e0-c0fa86f572c3",
							version: [0, 0, 1],
							min_engine_version: [1, 13, 0]
						},
						modules: [{
							description: t,
							type: "resources",
							uuid: "591bfece-6839-435b-b362-405aaf035dea",
							version: [0, 0, 1]
						}]
					})), ATLAS_CLEAN) {
					let n = new Array,
						r = function(e, t) {
							if (e.isDirectory()) {
								let a = e.listFiles();
								for (let e = 0; e < a.length; e++) r(a[e])
							}
							t || n.push(e)
						};
					r(new java.io.File(__dir__ + "resources/items-opaque"), !0), r(new java.io.File(__dir__ + "resources/terrain-atlas"), !0);
					for (let a = n.length; 0 < n.length;) $tip("remains " + n.length + "/" + a + " files"), n.shift().delete()
				}
			}(),
			function() {
				let milliseconds = Date.now();
				! function() {
					for (let i = 0; i < arguments.length; i += 2) {
						let name = "$" == arguments[i][0] ? arguments[i].slice(1) : arguments[i],
							file = new java.io.File(__packdir__ + "assets/resource_packs/vanilla/" + name),
							json = Files.readFileText(file);
						try {
							json = JSON.parse(json)
						} catch (e) {
							eval("json = " + json)
						}
						$tip("parsing " + name), arguments[i + 1].call(json, file);
						let path = "$" == arguments[i][0] ? __dir__ + "assets/resource_packs/devseverywhere/" : __dir__ + "resources/";
						Files.assureDir(new java.io.File(path + name).getParent()), Files.writeFileText(path + name, JSON.stringify(json))
					}
				}("splashes.json", function(e) {
					for (let e = 0; e < this.splashes.length; e++) {
						if (Math.random() < .05 && (this.splashes[e] = __name__ + "!"), Math.random() < .2) this.splashes[e] = this.splashes[e].split("").reverse().join("");
						else if (Math.random() < .1) {
							this.splashes[e] = this.splashes[e].split("").join();
							continue
						}
						Math.random() < .1 && (this.splashes[e] = this.splashes[e].split("").sort().join("")), Math.random() < .3 && (this.splashes[e] = this.splashes[e].split("").map(function(e, t, a) {
							return Math.random() < .5 ? e.toUpperCase() : e.toLowerCase()
						}).join("")), Math.random() < .2 && (this.splashes[e] = this.splashes[e].split("").map(function(e, t, a) {
							return e.charCodeAt(0)
						}).join(""))
					}
				}, "$biomes_client.json", function(e) {
					for (let t in this.biomes) {
						let a = this.biomes[t];
						$hex(a, "water_surface_color", "water_fog_color", "fog_color")
					}
				}, "$sounds/sound_definitions.json", function(e) {
					let r = new Array;
					for (let t in this) {
						let a = this[t].sounds;
						r = r.concat(a)
					}
					for (let n in this) this[n].sounds = this[n].sounds.map(function(e, k, a) {
						let t = $rnd(r.length),
							n = r[t];
						return Math.random() < .5 && ("object" != typeof n && (n = {
							name: n
						}), n.pitch = $rnd(20) / 10, Math.random() < .6 && (n.volume = $rnd(100) / 10)), r.splice(t, 1), n
					})
				}, "$textures/flipbook_textures.json", function(e) {
					for (let e = 0; e < this.length; e++) void 0 !== this[e].ticks_per_frame && (this[e].ticks_per_frame = $rnd(1, 8) * this[e].ticks_per_frame)
				}, "$textures/terrain_texture.json", function(e) {
					for (let t in this.texture_data) {
						let a = this.texture_data[t];
						if (Array.isArray(a.textures))
							for (let e = 0; e < a.textures.length; e++) {
								let n = a.textures[e];
								$hex(n, "overlay_color", "tint_color")
							} else "object" == typeof a.textures && $hex(a.textures, "overlay_color", "tint_color")
					}
				}, "ui/_global_variables.json", function(e) {
					for (let t in this) this[t] = [$rnd(100) / 100, $rnd(100) / 100, $rnd(100) / 100]
				}), log("Json done in " + (Date.now() - milliseconds) + "ms")
			}();
			let $atlas = function(e, t) {
					return e < t ? t / e : 1
				},
				$ex = function(e, t) {
					return MODIFIER / e
				},
				$width = function(e, t) {
					return e * $ex(e, t)
				},
				$height = function(e, t) {
					return t * $ex(e, t)
				},
				$imm = function(e, t, a) {
					let n = android.graphics.Bitmap.createBitmap(e, 0, 0, t, a),
						r = android.graphics.Bitmap.createScaledBitmap(n, $width(t, a), $height(t, a), !1);
					a = r.copy(android.graphics.Bitmap.Config.ARGB_8888, !0);
					return n.recycle(), r.recycle(), a
				},
				REQUIRED = ["pack_icon.png", "grass_top.png", "grass_carried.png", "gravel.png", "andesite.png", "diorite.png", "granite.png", "stone.png", "sand.png", "netherrack.png", "sun.png", "moon_phases.png", "clouds.png", "map_background.png", "birch.png", "evergreen.png", "foliage.png", "grass.png", "swamp_foliage.png", "swamp_grass.png"],
				$ptf = function(t, e, r, i) {
					let a = e.length + t.length + 2;
					let s = new java.io.File(e + "/" + t),
						c = s.isDirectory() ? Resources.getAllMatchingResourcesInDir(s, "(.*/)*.+\\.png$") : s.exists() ? [s.getPath()] : new Array;
					for (let e = 0; e < c.length; e++) {
						let o = c[e].slice(a, c[e].length);
						$tip("decoding " + t + "/" + o);
						let n = Files.readFileAsBitmap(c[e]);
						if (null != n) {
							s.isDirectory() && Files.assureDir(r), width = n.getWidth(), height = n.getHeight();
							let e = $imm(n, width, height),
								t = new android.graphics.Canvas(e),
								a = new android.graphics.Paint;
							a.setXfermode(new android.graphics.PorterDuffXfermode(android.graphics.PorterDuff.Mode.SRC_IN)), width = e.getWidth(), height = e.getHeight();
							let d = $atlas(width, height),
								l = 0 != REQUIRED.indexOf(o);
							for (let e = 0; e < d; e++) t.drawBitmap((l ? FACES : i)[$rnd(l ? FACES.length - 1 : i.length - 1)], 0, width * e, a);
							Files.writeBitmap(r + "/" + o, e), n.recycle(), e.recycle()
						} else log(o + " skipped, not found")
					}
				},
				$loc = function(e, t, a, n) {
					e = FACE[e];
					if (t <= e.length / 4 - 1) return [e[t *= 4], e[t + 1], e[t + 2] - e[t], e[t + 3] - e[t + 1]];
					e = $rnd(1, a), t = $rnd(1, n);
					return [$rnd(a - e), $rnd(n - t), e, t]
				},
				FACES = new Array,
				$bmp = function(a, e) {
					let n = new Array;
					if (e <= 0) return n;
					let t = $byt(__dir__ + "assets/" + a);
					let r = Files.bitmapFromBytes(t);
					if (null == r) return n;
					let i = r.getWidth(),
						s = r.getHeight();
					for (let t = 0; t < e; t++) {
						let c = $loc(a, t, i, s);
						let e = android.graphics.Bitmap.createBitmap(r, c[0], c[1], c[2], c[3]);
						let o = android.graphics.Bitmap.createScaledBitmap(e, MODIFIER, MODIFIER, !1),
							k = FACE[a];
						t <= k.length / 4 - 1 && FACES.push(o), n.push(o), e.recycle()
					}
					return r.recycle(), n
				};
			! function() {
				let e = Date.now();
				let t = Files.listDirectory(__dir__ + "assets"),
					o = new Array;
				t = t.filter(function(e, t, a) {
					return new java.io.File(__dir__ + "assets", e).isFile()
				});
				for (let e = 0; e < t.length; e++) {
					let a = FACE[t[e]] ? FACE[t[e]].length / 4 : 0;
					$tip("encoding " + e + "/" + t.length + " images"), o = o.concat($bmp(t[e], $rnd(0, a) + $rnd(0, RANDOM_ENCOUNTER)))
				}! function() {
					let a = Resources.getAllResourceDirectoriesPaths();
					a.push(__packdir__ + "assets/resource_packs/vanilla");
					let e = Files.listDirectory(__packdir__ + "assets/resource_packs"),
						n = ["chemistry", "vanilla_1.14", "vanilla_1.15", "vanilla_1.16", "vanilla_1.16.100", "vanilla_1.16.200"];
					e = e.filter(function(e, t, a) {
						return -1 != n.indexOf(decodeURI(e))
					});
					let r = e.map(function(e, t, a) {
						return __packdir__ + "assets/resource_packs/" + e
					});
					r.push(__packdir__ + "assets/textures");
					for (let t = 0; t < arguments.length; t++) {
						let i = Date.now();
						if (0 < a.length) {
							let s = __dir__ + "resources/" + arguments[t];
							for (let e = 0; e < a.length; e++) a[e] != __dir__ + "resources" && $ptf(arguments[t], a[e], s, o)
						}
						if (0 < r.length) {
							let c = __dir__ + "assets/resource_packs/devseverywhere/" + arguments[t];
							for (let e = 0; e < r.length; e++) $ptf(arguments[t], r[e], c, o)
						}
						log("Atlas " + arguments[t] + " done in " + (Date.now() - i) + "ms")
					}
				}("pack_icon.png", "textures/blocks", "terrain-atlas", "textures/items", "items-opaque", "textures/models/armor", "textures/map", "textures/misc", "textures/particle", "particle-atlas", "textures/environment", "textures/colormap", "textures/entity/bed", "textures/entity/bell", "textures/entity/boat", "textures/entity/chest", "textures/entity/pistonarm", "textures/entity/armor_stand.png", "textures/entity/beacon_beam.png", "textures/entity/end_portal.png", "textures/entity/sign.png", "textures/entity/sign_acacia.png", "textures/entity/sign_birch.png", "textures/entity/sign_darkoak.png", "textures/entity/sign_jungle.png", "textures/entity/sign_spruce.png", "textures/entity/trident.png", "textures/entity/trident_riptide.png", "textures/flame_atlas.png", "textures/blocks/huge_fungus");
				for (let e = 0; e < o.length; e++) o[e].recycle();
				log("Bitmap done in " + (Date.now() - e) + "ms")
			}(), $tip("build")
		}
	}
}({
	0: {
		"379d7727a558a82db365339ecb1a376": [582, 387, 792, 615],
		fb1f8f468ed29fa45a91fbab3fac4f9: [765, 456, 1071, 756],
		ab858d22bd1a74180b99564355cbe: [1194, 603, 1647, 1182],
		"1a7a60585328ef592a67f4a92d3c46cc": [364, 366, 525, 573],
		c44c3bd6e0762fea8c5213476de7ee0: [600, 267, 942, 609],
		"21a5e6508a1bc4a6ec7a77189afe29": [528, 762, 762, 1077],
		fab1dd7830debc3604efb76ce309ccb: [213, 600, 636, 1188],
		"625010d749892517d1b7dd3321c34e5e": [447, 177, 513, 288],
		f7c84256497ba720fb0808df3e23b3: [924, 807, 1077, 1017],
		"159d123773b9f24d2e9874885823ea": [798, 963, 1176, 1551],
		"9d8ce9b2ace47b2b68f372db3028b8d4": [1215, 564, 1677, 1191],
		"548decebb1d3dc64518fae2e292d4b": [564, 426, 753, 597],
		"64cd72fc333190b6bc9e362e273dec21": [282, 468, 485, 714],
		be2eb6b212cd72533032fc436898e62: [153, 492, 783, 1347],
		"8fb7793cd93e9d22d6a769d762bdfd2": [1119, 678, 1641, 1281],
		cc696a27444cb4ba71eafaef55fba9f: [774, 168, 951, 528],
		"34235153c725783890d2d9ffa13fef": [258, 195, 414, 327, 408, 420, 486, 486],
		df4be543abca9d79ba15c81d635d4bb7: [1137, 231, 1209, 312],
		f88135e2ab4b69ba2f444d71c1d7e5: [117, 594, 1020, 1521],
		cee0b6212bac3c1cc36a4e744d5a5: [72, 87, 213, 264],
		de1304a3bb7b482dc5c89dbf6b5a72: [240, 69, 333, 201],
		"087799698a36a7692269c3c591dee2b": [105, 267, 378, 561],
		"41d6962aabfb9d99816446a851f9d8": [654, 567, 753, 684],
		bb1aef1f63752f5bbbf745ea5ff82: [102, 204, 384, 573],
		c992dde9c049c27d2840a93d6ab2f35: [519, 354, 633, 456],
		c9654fce283315cfe5ec629c6cff305b: [336, 291, 507, 504, 9, 36, 255, 369, 540, 450, 747, 756],
		f885dad6c6314bc23a16ba93e1bbbe1f: [402, 375, 1155, 1500],
		"1ba468f415bb93dd18f174eda51b1434": [213, 465, 984, 1389]
	},
	1: {
		"2099faa09a39abc682421f9462d9e5e7": [1368, 582, 1602, 822],
		"9789117f857f79f1ccc7dc24459e62": [636, 36, 960, 324],
		"9372608df2557d2ce629ed3d78555f33": [60, 315, 270, 630, 510, 360, 660, 510],
		b7518f4a156cb8e3bcb0ddbbd99e57: [72, 162, 180, 246],
		"292ede9574923fc26ee79622a94abf3b": [480, 441, 648, 642],
		db8620a3f695d2615e1d9fac735c2a4: [402, 375, 861, 855, 1302, 501, 1662, 861],
		"113d931a9afe4d6c1e938de54725352d": [111, 195, 252, 324],
		dd487abfbea8862cb4e9e6227c3b9d9: [594, 906, 1266, 1638],
		fbe3ad4b49801ee6d37eea5b152bbcd5: [435, 645, 546, 822],
		"24b58294f15a62480c9c1afb0d4ee36": [145, 354, 330, 582],
		"37a9cd4e6ff0bd651b29dd5ed5fb915c": [312, 75, 501, 366],
		"3ada1e4b7ad6747aa1721707f9571c7": [852, 126, 1095, 387],
		"77b918c895a27373364ac8cc1b332": [1026, 216, 1435, 771, 1650, 165, 2256, 744],
		"889e766b2a0b58b6e263f45f0377a3e": [318, 312, 768, 810],
		"79b0243f563316ab6196679fe9f4680": [285, 224, 345, 282],
		b98ccee62d66e8a2cf8168139358d27b: [594, 312, 870, 672],
		a0b12bad6033f06f99e3ab1679be4096: [114, 1068, 366, 1230],
		b1aa8d486e372ed9fae6bf0a18dfb95: [690, 450, 845, 624],
		b0cb6549f17a7886463eda5924653b7: [156, 54, 660, 366],
		"966b331fb9da4f4e92538fd82baa92e": [15, 105, 237, 402],
		"3623d7a431b644f05a9b29975a9437": [243, 213, 624, 852],
		"1842e02273405f88209d639667fc6e78": [984, 405, 1602, 1266],
		"2970caa8bb86c4e8ce1501fb82779a5": [1122, 921, 1302, 1113],
		"91d7c1b3d75543b743af225470679861": [132, 102, 1326, 2082],
		b61928725bae566af7e7cfb29fee1b6: [276, 414, 843, 1035],
		bbf897653baca575263b6efe662f31b: [342, 276, 561, 630],
		"344052368ea8428816a5191cc57def88": [537, 816, 1056, 1470],
		f4922fa3d37b72a2d405adc16d033a9: [294, 141, 534, 381, 90, 315, 258, 444, 915, 546, 1002, 618]
	},
	2: {
		e1f523fa4089ff1323e19669d13bed3: [321, 264, 642, 747],
		beb12e479eef5dbceac06f20733e1c3b: [30, 0, 610, 640],
		"55f4a1fffd93a48718511866f7a801": [1002, 561, 1449, 1077],
		fff756094e42c18e05188a16a5b90d6: [801, 1185, 1122, 1716],
		ca9b6a4b45e197ea827dede48dcb5def: [1164, 933, 1512, 1392],
		ae378d812b9d9995e3fa5ef98a5ca2: [195, 66, 435, 375],
		"8d96e2bf90f0ce31bf209e161a43f0aa": [177, 285, 1395, 2124]
	},
	3: {
		"1ea968e6f67aa643254e6a9e14123b7": [300, 195, 372, 285, 126, 351, 189, 438, 485, 357, 540, 435, 576, 600, 615, 636, 219, 435, 255, 495, 561, 132, 597, 171, 114, 465, 156, 507, 180, 534]
	}
});
