# UTM / QEMU on M1 Mac

## For the most up to date version of this document, [see here](https://corbanvilla.notion.site/UTM-QEMU-on-M1-Mac-175ceda115c742a885ec1387acf994df?pvs=4).

Created by: Corban Villa
Created time: September 12, 2023 11:41 PM
Last edited time: January 26, 2024 4:59 PM

# `x86` Virtual Machines on M1 Macs

## 👩‍🏫 Guides

- CS6575 Final Project
    1. Download both VM `.ova` files.
        1. **Final Server**
        2. **Final Client**
    2. Follow [💾 Importing an `x86` VM](https://www.notion.so/Importing-an-x86-VM-cff3f9e167824457bd9bdf582c22e542?pvs=21) for both VMs
    3. Configure network specific settings:
        1. Make sure both VMs are shut off.
            1. **Right Click → Stop**
        2. On Final Server VM:
            1. **VM Settings → Network → Show Advanced Settings → Guest Network**: `10.10.0.0/24`
        3. On Final Client VM:
            1. **VM Settings → Network → Remove**
        4. Follow networking setup [Between `2` VMs (no host)](https://www.notion.so/Between-2-VMs-no-host-c568633f1d204f05bfe4ecac17165075?pvs=21) 
    4. Start both VMs and ping the server
        1. `ping 10.10.0.66`
    5. Add route on your host and test pings
        
        ```bash
        sudo route add 172.16.1.0/24 10.10.0.66
        ping 172.16.1.1
        ping 172.16.1.2
        ```
        
    6. If you have a  [Kali Linux VM (ARM)](https://www.notion.so/Kali-Linux-VM-ARM-b185c42992f947b793dc8b5507e1074a?pvs=21) on **Shared Network** (default), you should be able to `ping` (and communicate) with both VMs from Kali as well.
        
        <aside>
        💡 If the route is configured on the host, no additional routing configuration should need to be done on Kali. Otherwise, Kali will need the `route add`.
        
        </aside>
        
- Kali Linux VM (ARM)
    
    <aside>
    💡 This guide configures an ARM-based Kali installation. This means it will run faster and more reliably on M{1,2,3} chips.
    
    However, it will also not support `x86`-only programs (`execstack`, `edb` to name a few). If you need an `x86` Kali, download a [QEMU VM from the Kali download page](https://www.kali.org/get-kali/#kali-virtual-machines) and follow [💾 Importing an `x86` VM](https://www.notion.so/Importing-an-x86-VM-cff3f9e167824457bd9bdf582c22e542?pvs=21).
    
    </aside>
    
    1. Follow steps outlined on this guide
        
        [Kali inside UTM (Guest VM) | Kali Linux Documentation](https://www.kali.org/docs/virtualization/install-utm-guest-vm/)
        
    2. **[Optional,Recommended]** Install the SPICE agent in Kali to enable clipboard sharing
        
        ```bash
        sudo apt update && sudo apt install spice-vdagent
        ```
        
    3. **[Optional]** Install other guest support features (shared folders, time syncing, etc)
        
        [Linux](https://docs.getutm.app/guest-support/linux/)
        

---

## 💾 Importing an `x86` VM

<aside>
💡 Steps 1 and 2 are only necessary if the VM isn’t already in `.qcow2` format.

</aside>

1. Install QEMU command line tools
    1. [Install `homebrew`](https://brew.sh/)
    2. `brew install qemu`
2. Convert disk image to `qcow2`:
    - **VDI**
        
        ```bash
        # Adjust these to your files
        export INPUT_FILE=SEED-Ubuntu20.04.vdi
        export OUTPUT_FILE=SEED-Ubuntu20.04.qcow2
        qemu-img convert \
        	-f vdi \
        	$INPUT_FILE \
        	-O qcow2 \
        	$OUTPUT_FILE
        ```
        
    - **OVA**
        
        ```bash
        # Extract the file
        tar xvf wumpus.ova
        
        # Identify the .vmdk file
        ls -1 *.vmdk
        ```
        
        ```bash
        # Adjust these to your files
        export FILE=wumpus-disk001
        export INPUT_FILE=$FILE.vmdk
        export OUTPUT_FILE=$FILE.qcow2
        qemu-img convert \
        	-f vmdk \
        	$INPUT_FILE \
        	-O qcow2 \
        	$OUTPUT_FILE
        ```
        
    - **VMDK**
        
        ```bash
        # Adjust these to your files
        export INPUT_FILE=Metasploitable.vmdk
        export OUTPUT_FILE=Metasploitable.qcow2
        qemu-img convert \
        	-f vmdk \
        	$INPUT_FILE \
        	-O qcow2 \
        	$OUTPUT_FILE
        ```
        
3. Create a new virtual machine:
    - Instructions
        1. Open **UTM**
        2. Click **+** (Create New VM)
        3. Choose **Emulate** (for x86 architectures)
        4. Choose **Other** (NOT Linux)
        5. Check **Skip ISO Boot**
        6. Customize **Hardware** settings (or leave as default):
            - See details
                1. **Architecture**
                    1.  `x86_64` (default) if unsure.
                2.  **Memory**
                    1. `4096 MB` is usually adequate for graphical environments.
                    2. `1024 MB` is usually adequate for shell-only environments
        7. Set **Storage** size to `1 GB`
        8. Skip **Shared Directory**
        9. Under **Summary**
            1. Set a **Name**
            2. Check **Open VM Settings**
            3. Click **Save**
4. Configure **VM Settings** (required)
    - Instructions
        
        **→ System**
        
        **→ CPU Cores**
        
        - `4` for graphical environments
        - `2` for shell-only environments
        - Adjust as needed
        
        **→ Force Multicore**
        
        - [x]  Enabled
        
        **→ QEMU → Tweaks → UEFI Boot**
        
        - [ ]  Disabled
        
        **→ Drives → IDE Drive → Delete**
        
        - Confirm
        
        **→ Drives → New → Import**
        
        - Navigate to your converted `.qcow2` image
        
        **→ Save**
        
5. Click ▶️ to start the VM

---

## 🤖 Communication Between VMs

### Between `N` VMs (host-connected)

<aside>
💡 Note: Your host will claim the `x.x.x.1` IP address.

</aside>

- Simply enabled **Shared Network** in **VM Settings**.

### Between `2` VMs (no host)

- Instructions
    
    <aside>
    💡 Note that your hosts must be configured with static IP addresses, since there won’t be a DHCP server to assign them.
    
    </aside>
    
    1. Right click both VMs in the menu, and click **Stop**.
        1. Confirm
    2. Right click **VM 1** in the menu, and click **Edit**.
        
        **→ QEMU → Arguments**
        
        1. Scroll to the bottom and add `4` new entries:
            - `-device`
            - `e1000,mac=D6:99:57:5F:B5:A1,netdev=vlan`
            - `-netdev`
            - `socket,id=vlan,listen=localhost:1234`
        
        <aside>
        💡 UTM is finicky and you need to click off the entry input box before saving, otherwise it won’t save.
        
        </aside>
        
    3. **Save**.
    4. Right click **VM 2** in the menu, and click **Edit**.
        
        **→ QEMU → Arguments**
        
        1. Scroll to the bottom and add `4` new entries:
            - `-device`
            - `e1000,mac=D6:99:57:5F:B5:A2,netdev=vlan`
            - `-netdev`
            - `socket,id=vlan,connect=localhost:1234`
                - Note this is `connect` and not `listen` from **VM 1**.
                - Since it’s a connect/listen TCP socket for the QEMU network backend, the VM with `listen` must start before the VM with `connect`. Otherwise, the `connect` VM will need to restart again before being able to network with the `listen` VM.
        
        <aside>
        💡 UTM is finicky and you need to click off the entry input box before saving, otherwise it won’t save.
        
        </aside>
        
    5. **Save**.
    6. **Start** both VMs again, in the right order [**VM 1** and then **VM 2**].

### Between `3+`  VMs  (host-connected, no WAN)

- Instructions
    
    <aside>
    💡 This may work now just by selecting **Host Only Network** on all VMs (untested).
    
    If not, see [this reference](https://github.com/utmapp/UTM/issues/4190) to get it working manually.
    
    </aside>
    

---

## 🔨 Troubleshooting

### General

- VM boots to `UEFI Interactive Shell`
    
    ### **Issue**
    
    <aside>
    💡 This can happen if disabling UEFI mode was not saved.
    
    </aside>
    
    ### **Example**
    
    ![Untitled](UTM%20QEMU%20on%20M1%20Mac%20175ceda115c742a885ec1387acf994df/Untitled.png)
    
    ### Solutions
    
    1. **Close** the VM screen.
    2. Right click the VM in the menu, and click **Stop**.
        1. Confirm
    3. Right click the VM in the menu, and click **Edit**.
        
        **→ QEMU → Tweaks → UEFI Boot**
        
        - [ ]  Disabled
    4. **Save**.
    5. **Start** VM again.
    
- VM stuck while booting
    - Turn it off and turn it back on again 😉

### Networking

- [Between `2` VMs (no host)](https://www.notion.so/Between-2-VMs-no-host-c568633f1d204f05bfe4ecac17165075?pvs=21) not working
    1. Did you confirm the settings saved in UTM?
        1. Double-check your work
    2. Did you start the VMs in the right order?
        1. Start `listen` before `connect` VM (see docs again for details).
    3. Did your host computer lock or go to sleep?
        1. Restart the VMs (complete start and stop) for good measure.
    4. Did you add the proper routes?
        1. Re-add the routes for good measure.
            
            ```bash
            sudo route delete 172.16.1.0/24 10.10.0.66
            sudo route add 172.16.1.0/24 10.10.0.66
            netstat -nr | grep 172.16
            ```
            

---

## 📚 Resources

### UTM

- [https://docs.getutm.app/settings-qemu/settings-qemu/](https://docs.getutm.app/settings-qemu/settings-qemu/)
- [https://docs.getutm.app/settings-qemu/devices/network/network/](https://docs.getutm.app/settings-qemu/devices/network/network/)

### QEMU Networking

- [https://wiki.qemu.org/Documentation/Networking](https://wiki.qemu.org/Documentation/Networking)
- [https://github.com/utmapp/UTM/issues/4190](https://github.com/utmapp/UTM/issues/4190)
- [https://gist.github.com/mcastelino/88195a7d99811a177f5e643d1465e19e](https://gist.github.com/mcastelino/88195a7d99811a177f5e643d1465e19e)
    
    [qemu_netdev_socket_vlan.md.txt](UTM%20QEMU%20on%20M1%20Mac%20175ceda115c742a885ec1387acf994df/qemu_netdev_socket_vlan.md.txt)
    
    - Haven’t managed to get multicast working yet, though this is interesting.
    - [Issue 4190](https://github.com/utmapp/UTM/issues/4190) seems to indicate it doesn’t work with UTM.
- [https://lists.nongnu.org/archive/html/qemu-discuss/2014-11/msg00020.html](https://lists.nongnu.org/archive/html/qemu-discuss/2014-11/msg00020.html)

### Metasploitable

- [https://docs.rapid7.com/metasploit/metasploitable-2/](https://docs.rapid7.com/metasploit/metasploitable-2/)
- [https://dev.to/merlos/how-to-setup-metasploitable-in-a-mac-with-m1-chip-44ph](https://dev.to/merlos/how-to-setup-metasploitable-in-a-mac-with-m1-chip-44ph)
    
    [How to setup Metasploitable in a Mac with M1 chip - Reader Mode.pdf](UTM%20QEMU%20on%20M1%20Mac%20175ceda115c742a885ec1387acf994df/How_to_setup_Metasploitable_in_a_Mac_with_M1_chip_-_Reader_Mode.pdf)
    

### Seed Labs

- [https://github.com/seed-labs/seed-labs/pulls?q=utm](https://github.com/seed-labs/seed-labs/pulls?q=utm)
- [https://seedsecuritylabs.org/labsetup.html](https://seedsecuritylabs.org/labsetup.html)