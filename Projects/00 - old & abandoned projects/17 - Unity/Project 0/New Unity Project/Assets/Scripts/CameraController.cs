using UnityEngine;
using System.Collections;

public class CameraController : MonoBehaviour
{

    public GameObject player;
    public float camera_snappyness;

    private Vector3 offset;
    private Vector3 initial_offset;
    private int facingdirection = 1;
    //Time.deltaTime;
    void Start()
    {
        initial_offset = transform.position - player.transform.position;
        offset = initial_offset;
    }

    void LateUpdate()
    {
        transform.position = new Vector3(
                   (player.transform.position.x) + offset.x,
                   player.transform.position.y + offset.y,
                   (player.transform.position.z) + offset.z
        );
        transform.LookAt(player.transform.position);
    }
    void Update()
    {
        if (Input.GetKeyDown("e"))
        {
            facingdirection++;
            if (facingdirection == 5)
            {
                facingdirection = 1;
            }
        }
        if (Input.GetKeyDown("1"))
        {
            facingdirection = 1;
        }
        else if (Input.GetKeyDown("2"))
        {
            facingdirection = 2;
        }
        else if (Input.GetKeyDown("3"))
        {
            facingdirection = 3;
        }
        else if (Input.GetKeyDown("4"))
        {
            facingdirection = 4;
        }


        if (facingdirection==1)
        {
            if (offset.x - camera_snappyness * Time.deltaTime > initial_offset.x)
            {
                offset.x -= camera_snappyness* Time.deltaTime;
            } else if (offset.x + camera_snappyness * Time.deltaTime < initial_offset.x)
            {
                offset.x += camera_snappyness* Time.deltaTime;
            }
            else
            {
                offset.x = initial_offset.x;
            }

            if (offset.z - camera_snappyness * Time.deltaTime > initial_offset.z)
            {
                offset.z -= camera_snappyness* Time.deltaTime;
            }
            else if (offset.z + camera_snappyness * Time.deltaTime < initial_offset.z)
            {
                offset.z += camera_snappyness* Time.deltaTime;
            }
            else
            {
                offset.z = initial_offset.z;
            }
            //works?
        }
        else if (facingdirection==2)
        {
            if (offset.x - camera_snappyness * Time.deltaTime > initial_offset.z)
            {
                offset.x -= camera_snappyness* Time.deltaTime;
            }
            else if (offset.x + camera_snappyness * Time.deltaTime < initial_offset.z)
            {
                offset.x += camera_snappyness* Time.deltaTime;
            }
            else
            {
                offset.x = initial_offset.z;
            }

            if (offset.z - camera_snappyness * Time.deltaTime > initial_offset.x)
            {
                offset.z -= camera_snappyness* Time.deltaTime;
            }
            else if (offset.z + camera_snappyness * Time.deltaTime < initial_offset.x)
            {
                offset.z += camera_snappyness* Time.deltaTime;
            }
            else
            {
                offset.z = initial_offset.x;
            }
            //offset = new Vector3(initial_offset.z,initial_offset.y,initial_offset.x);
        }
        else if (facingdirection==3)
        {
            {
                if (offset.x - camera_snappyness * Time.deltaTime > -initial_offset.x)
                {
                    offset.x -= camera_snappyness* Time.deltaTime;
                }
                else if (offset.x + camera_snappyness * Time.deltaTime < -initial_offset.x)
                {
                    offset.x += camera_snappyness * Time.deltaTime;
                }
                else
                {
                    offset.x = -initial_offset.x;
                }

                if (offset.z - camera_snappyness * Time.deltaTime > -initial_offset.z)
                {
                    offset.z -= camera_snappyness * Time.deltaTime;
                }
                else if (offset.z + camera_snappyness * Time.deltaTime < -initial_offset.z)
                {
                    offset.z += camera_snappyness * Time.deltaTime;
                }
                else
                {
                    offset.z = -initial_offset.z;
                }
                //offset = new Vector3(-initial_offset.z, initial_offset.y, -initial_offset.x);
            }
        }
        else if (facingdirection==4)
        {
            if (offset.x + camera_snappyness * Time.deltaTime < -initial_offset.z)
            {
                offset.x += camera_snappyness * Time.deltaTime;
            }
            else if (offset.x - camera_snappyness * Time.deltaTime > -initial_offset.z)
            {
                offset.x -= camera_snappyness * Time.deltaTime;
            }
            else
            {
                offset.x = -initial_offset.z;
            }

            if (offset.z + camera_snappyness * Time.deltaTime < -initial_offset.x)
            {
                offset.z += camera_snappyness * Time.deltaTime;
            }
            else if (offset.z - camera_snappyness * Time.deltaTime > -initial_offset.x)
            {
                offset.z -= camera_snappyness * Time.deltaTime;
            }
            else
            {
                offset.z = initial_offset.x;
            }
            //offset = new Vector3(-initial_offset.z, initial_offset.y, -initial_offset.x);
        }
    }      
}